var mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: String,
        default: Date.now
    },
    last_modified_time: {
        type: String,
        default: Date.now
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    avater: {
        type: String,
        default: '/public/img/avatar-max-img.png'
    },
    bio: {
        type: String,
        default: ''
    },
    birthday: {
        type: Date
    },
    status: {
        type: String,
        enum: [0, 1, 2],
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);