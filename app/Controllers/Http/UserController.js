'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

class UserController {
  create ({ view }) {
    return view.render('user.create')
  }

  async store ({ session, request, response }) {

    const data = request.only(['username', 'email', 'password', 'password_confirmation'])

    const validation = await validateAll(data, {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required_if:password|same:password',
    })

  
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    // Deleting the confirmation field since we don't
    // want to save it
    delete data.password_confirmation

  
    await User.create(data)

    return response.redirect('/')
  }
}

module.exports = UserController
