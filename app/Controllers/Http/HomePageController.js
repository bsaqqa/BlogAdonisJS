'use strict'

class HomePageController {
    
    // const Post = use("App/Models/Post");

    index({request, response, view}) {
        // return response.json({
        //     messagge: "response successfuly"
        // });
        return view.render("index");
    }

    profile({request, response, view}){
        let collection= [
            {id:1, text:"1"},
            {id:2, text:"2"},
            {id:3, text:"3"},
        ];
        // let posts = Post.get();
        return view.render("user.profile", {
          username: "Baraa",
          collection,
        });
    }
}

module.exports = HomePageController
