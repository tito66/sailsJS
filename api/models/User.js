/**
 * User
 * @description :: Model for storing users
 */
module.exports = {

	connection: 'someMysqlServer',
    schema: true,

    attributes: {
        username: {
            type: 'string',
            required: false,
            unique: true,
            //alphanumericdashed: true
        },
        password: {
            type: 'string'
        },
        email: {
            type: 'email',
           // email: true,
            //required: true,
            unique: true
        },
        firstName: {
            type: 'string',
            defaultsTo: ''
        },
        lastName: {
            type: 'string',
            defaultsTo: ''
        },
        /*
        role: {
        type: 'INTEGER',
        required: false
        },
        */
        photo: {
            type: 'string',
            defaultsTo: '',
            url: true
        },
        socialProfiles: {
            type: 'object',
            defaultsTo: {}
        },
 
        toJSON: function () {
            var obj = this.toObject();
            
            delete obj.password;
            delete obj.socialProfiles;
            return obj;
        }
    },
    beforeUpdate: function (values, next) {
        CipherService.hashPassword(values);
        next();
    },
    beforeCreate: function (values, next) {
        CipherService.hashPassword(values);
        next();
    },

    getAll: function() {
        return User.find()
        .then(function (models) {
            return [models];
        });
    },

    getOne: function(id) {
        return User.findOne(id)
        .then(function (model) {
            return [model];
        });
    },
    insert: function (userObject) {

        User.create(userObject)
            .exec(function(err, newUser) {
                if (err) {

                    return err;
                }
                else {
                    console.log(newUser);
                    return newUser;
                }
            });
    }


};