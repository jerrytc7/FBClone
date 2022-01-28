module Api 
  module V1
    class PostsController < ApplicationController
      before_action :check_user_signed_in

      def index 
        if params[:all] == "true"
          return render json: Post.all, include: :user, status: :ok
        end
        render json: current_user.posts, include: :user, status: :ok
      end

      def show
        post = Post.find_by(id: params[:id])
        render json: post, include: :user, status: :ok
      end


      def create 
        post = current_user.posts.create(post_params)
        if post.save
          render json: post, status: :created 
        else 
          render json: post.errors, status: 422
        end
      end


      def update
        post = Post.find_by(id: params[:id])
        raise 'Not authorized' if post.user_id != current_user.id

        if post.update(post_params)
          render json: post, status: :accepted
        else
          render json: post.errors, status: 422
        end
      end

      def destroy
        post = Post.find_by(id: params[:id])
        post.destroy
        head :no_content, status: :ok
      end

      private 

      def check_user_signed_in
        render(json: {}, status: 401) unless user_signed_in?
      end

      def post_params 
        params.require(:post).permit(:title, :content)
      end
    end
  end 
end
