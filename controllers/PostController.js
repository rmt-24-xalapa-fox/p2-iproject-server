const { User,Post,Comment,PostComment,PostFavourite} = require('../models')
const { Op } = require("sequelize");
const { tokenToPayload } = require("../helpers/jwt");

class PostController{
    static async addPost(req, res, next) {

        try {
            console.log(req.body);
            let UserId=req.user.id
            let { title, media, description } = req.body;
            if (!title || !description) {
                throw { statusCode: 400 }
            }
            const post = await Post.create({
                title,
                media,
                description,
                UserId
            });
            res.status(201).json({
                message: "Post created"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }

    }
    static async getPosts(req, res, next) {
        
        try {
            let title=req.query.title;
        let offset=req.query.page;
        let limit=req.query.limit;
        if(!limit){
            limit=2;
        }
        if(!offset){
            offset=0;
        }else{
            offset=offset*limit
        }
        console.log(offset+" is OFFSET");
        
        let userdata={
            model: User,
            attributes: ['email']
        }
        let where={}
        if(title){
            title= "%"+title+"%"
            where.title={[Op.iLike]: title}
        }
        let option ={
            limit: limit,
            offset: offset,
            where:where,
            distinct:true,
            include:userdata
            
        }
            console.log(option);
            let {count,rows} = await Post.findAndCountAll(option);
            console.log("Pages count: "+count +" limit"+limit+" totalPages "+Math.ceil(count/limit) +" offset "+offset )
            let totalPages=Math.ceil(count/limit)
            console.log(req.user);
            console.log("User found");
            if(req.user){
                
                if(req.user.id)
                    rows.forEach(element => {
                        
                        if(element.UserId!=req.user.id){
                            element.dataValues.canDonate=true;
                        }else{
                            element.dataValues.canDonate=false;
                        }
                    });
            }
            if (rows) {   
                res.status(200).json({ Posts: rows,totalPages });
            } else {
                throw { statusCode: 404 };
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getMyPosts(req, res, next) {
        try {
            
        
        let userdata={
            model: User,
            attributes: ['email']
        }
        let where={UserId:req.user.id}
        
        let option ={
            where:where,
            distinct:true,
            include:userdata
        }
            console.log(option);
            let rows = await Post.findAll(option);
           
                    rows.forEach(element => {
                        
                            element.dataValues.canDonate=false;
                        
                    });
            if (rows) {   
                res.status(200).json({ Posts: rows });
            } else {
                throw { statusCode: 404 };
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getPostDetail(req, res, next) {
        try {
            let {id}=req.params
            const post = await Post.findByPk(id);
            console.log(req.user);
            console.log(id);
            if(post){
                if(req.user){
                    if(post.UserId!=req.user.id){
                        post.canDonate=true;
                    }else{
                        post.canDonate=false;
                    }
                }
                
                console.log(post);
                let comments = await PostComment.findAll(
                    {where:{
                        PostId:post.id
                    },include:{
                        model: Comment,
                        include:{
                            model: User,
                            attributes: {
                                exclude: ['username', 'dateOfBirth','role','updatedAt',"createdAt","id",'password']
                            }
                        }
                    }
                }
                )

                res.status(200).json({Post:post,Comments:comments});
            }else{
                throw {statusCode:404};
            }
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deletePosts(req, res, next) {
        try {
            let {id}=req.params;
            const post = await Post.findByPk(id)
            if(post){
                post.destroy();
                res.status(404).json({message:"Post has been deleted"});
            }else{
                res.status(404).json({message:"Post not found"});
            }
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async updatePosts(req, res, next) {
        try {
            let {id}=req.params;
            let { title, media, description } = req.body;
            let post = req.posts;
            if(title){
                post.title=title;
            }
            if(media){
                post.media=media;
            }
            if(description){
                post.description=description;
            }
            post = await post.save();
            res.status(200).json({message:"Post have been saved"});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async promotePost(req, res, next) {

        try {
            console.log(req.body);
            let UserId=req.user.id
            let { title, media, description } = req.body;
            if (!title || !description) {
                throw { statusCode: 400 }
            }
            const post = await Post.create({
                title,
                media,
                description,
                UserId
            });
            res.status(201).json({
                message: "Post created"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async addComment(req, res, next) {

        try {
            console.log(req.body);
            let UserId=req.user.id
            let {id}=req.params;
            let { comment} = req.body;
            if (!comment) {
                throw { statusCode: 400 }
            }
            const post = await Post.findByPk(id);
            if(post){
                const comments = await Comment.create({
                    comment,
                    UserId
                });
                PostComment.create({CommentId:comments.id,PostId:post.id})
            }else{
                throw { statusCode: 404 }
            }
            
            res.status(201).json({
                message: "Comment created"
            });
            
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async addFavourite(req, res, next) {

        try {
            let UserId=req.user.id
            let {id}=req.params;
            const favourite = await PostFavourite.findOrCreate({
                where:{
                PostId:id,
                UserId
                }
            });
            res.status(201).json({
                message: "Post favourited"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getFavourites(req, res, next) {

        try {
            let UserId=req.user.id
            const favourite = await PostFavourite.findAll({where:{
                UserId
            },
            include:{
                model: Post,
                include:{
                    model: User,
                    attributes: ['email']
                }
            }
            });
            
            res.status(200).json({ Favourites: favourite });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async unfavourited(req, res, next) {

        try {
            let UserId=req.user.id
            let {id}=req.params
            const favourite = await PostFavourite.findByPk(id);
            if(favourite){
                favourite.destroy();
                res.status(200).json({message:"Unfavourited"});
            }else{
                res.status(200).json({message:"Unfavourited failed"});
            }
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports=PostController