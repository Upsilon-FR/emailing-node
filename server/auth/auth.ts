import jwt from 'jsonwebtoken';

export default class Authentication {
    static TOKEN = process.env.TOKEN || 'TEST_TOKEN';

    static auth = (data: Object) => {
        return jwt.sign(data, Authentication.TOKEN, { expiresIn: '1800s' })
    }
}