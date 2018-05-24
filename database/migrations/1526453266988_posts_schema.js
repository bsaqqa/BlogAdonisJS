'use strict'

const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments();
      table.string('title', 250).notNullable()
      table.text("body", "longtext").notNullable()
      // table.text("body").notNullable()
      table.integer('user_id', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
