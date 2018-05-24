'use strict'

class SessionController {
  create ({ view }) {
 
    return view.render('session.create')
  }

  /**
   * Store a session.
   */
  async store ({ auth, request, response, session }) {

    const { username, password } = request.all()
     
    try {
      await auth.attempt(username, password)
    } catch (e) {
     
      session.flashExcept(['password'])
      session.flash({ error: 'We cannot find any account with these credentials.' })
      return response.redirect('login')
    }

    return response.redirect('/')
  }

  async delete ({ auth, response }) {
  
    await auth.logout()
    return response.redirect('/')
  }
}

module.exports = SessionController
