module Api 
  module V1
    class PostsController < ApplicationController
      def index 
        if user_signed_in?
          render json: current_user.posts, include: :user, status: :ok
        else
          render json: {}, status: 401
        end 
      end

      def show
        if user_signed_in?
          post = Post.find_by(id: params[:id])
          render json: post, include: :user, status: :ok
        else
          render json: {}, status: 401
        end
      end
      

      def create 
        if user_signed_in? 
          if post = current_user.posts.create(post_params)
            render json: post, status: :created 
          else 
            render json: post.errors, status: 400
          end
        else 
          render json: {}, status: 401
        end
      end


      def update
        if user_signed_in?
          post = Post.find_by(id: params[:id])
          post.update(post_params)
          render json: post, status: :accepted
        else
          render json: {}, status: 401
        end
      end

      def destroy
        if user_signed_in?
          post = Post.find_by(id: params[:id])
          post.destroy
          head :no_content, status: :ok
        else
          render json: {}, status: 401
        end
      end

      private 

      def post_params 
        params.require(:post).permit(:title, :content)
      end
    end
  end 
end
