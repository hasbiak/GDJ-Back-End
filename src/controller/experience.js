const {
  addExperienceModel,
  editExperienceModel
} = require('../model/experience')
const helper = require('../helper/helper')

module.exports = {
  addExperience: async (req, res) => {
    try {
      const experience = req.body
      console.log(experience)
      let resultExperience
      for (let i = 0; i < experience.length; i++) {
        const {
          id_pekerja,
          posisi,
          at_company,
          date,
          description
        } = experience[i]
        const setExperience = {
          id_pekerja,
          posisi,
          at_company,
          date,
          description,
          created_at: new Date()
        }
        resultExperience = await addExperienceModel(setExperience)
      }
      return helper.response(
        res,
        200,
        'Success Add Experiences',
        resultExperience
      )
    } catch (err) {
      return helper.response(res, 400, 'Bad Request', err)
    }
  },
  editExperience: async (req, res) => {
    try {
      const { id_pekerja, id, posisi, at_company, date, description } = req.body
      const setData = {
        id_pekerja,
        id,
        posisi,
        at_company,
        date,
        description,
        updated_at: new Date()
      }
      console.log(setData.at_company)
      const edit = await editExperienceModel(setData, id)
      console.log(edit)
      return helper.response(
        res,
        200,
        `Success update experience user by id ${id_pekerja}`,
        edit
      )
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
