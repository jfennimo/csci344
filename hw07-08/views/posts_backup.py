from flask import Response, request
from flask_restful import Resource
from models import Post, db, Following

import json

def get_path():
    return request.host_url + 'api/posts/'


def get_list_of_user_ids_in_my_network(user_id):
    following = Following.query.filter_by(user_id=user_id).all()
    me_and_my_friend_ids = [rec.following_id for rec in following]
    me_and_my_friend_ids.append(user_id)
    return me_and_my_friend_ids

class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    # user doesn't specify a limit: 20
    # user specifies a value 
    def get(self):
        # get posts created by one of these users:
        #1. Get all of the user_ids of ppl that user #12 is following
        # following = Following.query.filter_by(user_id=self.current_user.id).all()
        
        # Building a list of our friend's usernames:
        # me_and_my_friend_ids = [rec.following_id for rec in following]

        me_and_my_friend_ids = get_list_of_user_ids_in_my_network(self.current_user.id)
        try:
            limit = request.args.get('limit') or 20
            limit = int(limit)
        except:
            return Response(
                json.dumps({'error': 'No String for limit.'}), status=400
            )
        if limit > 50:
            return Response(
                json.dumps({'error': 'Bad data. Limit cannot exceed 20.'}), status=400
            )

        posts = Post.query.filter(Post.user_id.in_(me_and_my_friend_ids)).limit(limit)
        return Response(json.dumps([post.to_dict() for post in posts]), mimetype="application/json", status=200)

    def post(self):
        # create a new post based on the data posted in the body 
        body = request.get_json()
        print(body)  
        return Response(json.dumps({}), mimetype="application/json", status=201)
        
class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
        

    def patch(self, id):
        # update post based on the data posted in the body 
        body = request.get_json()
        print(body)       
        return Response(json.dumps({}), mimetype="application/json", status=200)


    def delete(self, id):
        # delete post where "id"=id
        return Response(json.dumps({}), mimetype="application/json", status=200)


    def get(self, id):
        # get the post based on the id
        # yourself and your friends
        post = Post.query.get(id)
        me_and_my_friend_ids = get_list_of_user_ids_in_my_network(self.current_user.id)
        if post is None or post.user_id not in me_and_my_friend_ids:
            error_message = {
                'error': 'post' + str(id) + ' does not exist.'
            }
            return Response(json.dumps(error_message), mimetype="application/json", status=404)
        else:
            return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)

def initialize_routes(api):
    api.add_resource(
        PostListEndpoint, 
        '/api/posts', '/api/posts/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )
    api.add_resource(
        PostDetailEndpoint, 
        '/api/posts/<int:id>', '/api/posts/<int:id>/',
        resource_class_kwargs={'current_user': api.app.current_user}
    )