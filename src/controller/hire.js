const helper = require('../helper/helper')
const {
  hireModel,
  notifModels,
  getPekerjaById,
  getRecruiterById
} = require('../model/hire')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  hire: async (request, response) => {
    try {
      const { id_recruiter, id_pekerja, jobs_needed, desc_jobs } = request.body
      if (id_pekerja && jobs_needed && desc_jobs) {
        const setData = {
          id_recruiter,
          id_pekerja,
          files: request.file === undefined ? '' : request.file.filename,
          jobs_needed,
          desc_jobs,
          created_at: new Date()
        }
        const checkingIdPekerja = await getPekerjaById(id_pekerja)
        const checkingIdRecruiter = await getRecruiterById(id_recruiter)
        console.log(checkingIdPekerja)
        console.log(checkingIdRecruiter)
        if (checkingIdPekerja.length > 0 && checkingIdRecruiter.length > 0) {
          const result = await hireModel(setData)
          return helper.response(
            response,
            200,
            `Sending offering letter to ${id_pekerja}`,
            result
          )
        } else {
          return helper.response(
            response,
            400,
            'Make sure your id data input correct'
          )
        }
      } else {
        return helper.response(response, 400, 'All data must be filled in')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  notif: async (request, response) => {
    try {
      const { id } = request.params
      const hireNotif = await notifModels(id)
      if (hireNotif.length > 0) {
        client.setex(`GDJnotifById:${id}`, 1800, JSON.stringify(hireNotif))
        return helper.response(
          response,
          200,
          'You have an offering letter',
          hireNotif
        )
      } else {
        return helper.response(
          response,
          404,
          'There is no offering letter for you'
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
