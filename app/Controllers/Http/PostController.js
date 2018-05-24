'use strict'

const Post = use('App/Models/Post')
const { validateAll } = use('Validator')

class PostController { 
  async index ({ view }) {
    const posts = await Post.all()
    return view.render('posts.index', { posts: posts.toJSON() })
  }

  create ({ view }) {
    return view.render('posts.create')
  }

  async store ({ session, request, response }) {
  
    const data = request.only(['title', 'body'])

    const validation = await validateAll(data, {
      title: 'required',
      body: 'required',
    })

    /**
     * If validation fails, early returns with validation message.
     */
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }
    await Post.create(data)

    return response.redirect('/')
  }

  async edit ({ params, view }) {
   
    const post = await Post.findOrFail(params.id)

    return view.render('posts.edit', { post: post.toJSON() })
  }

  async update ({ params, session, request, response }) {
   
    const data = request.only(['title', 'body'])

    const validation = await validateAll(data, {
      title: 'required',
      body: 'required',
    })

   
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

   
    const post = await Post.findOrFail(params.id)
    post.merge(data)
    await post.save()

    return response.redirect('/')
  }

  async delete ({ params, response }) {
   
    const post = await Post.findOrFail(params.id)
    await post.delete()

    return response.redirect('/')
  }
}

module.exports = PostController
