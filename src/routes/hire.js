const router = require('express').Router()
const { authorization, isSeeker, isRecruiter } = require('../middleware/auth')
const uploadFiles = require('../middleware/multerFileHire')

const { hire, notif, deleteNotif } = require('../controller/hire')
const { notifRedis, clearRedis } = require('../middleware/redis')

router.post('/', authorization, isRecruiter, clearRedis, uploadFiles, hire)
router.get('/notif/:id', authorization, isSeeker, notifRedis, notif)
router.delete('/deletenotif/:id', authorization, isSeeker, deleteNotif)

module.exports = router
