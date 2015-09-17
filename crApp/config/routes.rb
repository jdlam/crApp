Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  namespace :api do
    resources :reviews, except: [:new, :edit]
  end

  get '/api/bathrooms/locate' => 'api/bathrooms#locate', as: :locate
  get '/api/bathrooms/zip_code' => 'api/bathrooms#zip_code', as: :zip_code
  namespace :api do
    resources :bathrooms, only: [:index, :show, :create]
  end

  resources :users, only: [:new, :create]

  # You can have the root of your site routed with "root"
  root 'welcome#index' #our main index page

  # Session Routes
  get '/login' => 'sessions#new', as: :login # shows our login page
  post '/login' => 'sessions#create' # the action of submitting the log in form
  get '/logout' => 'sessions#destroy' # clicking logout href - not button

  # Users Routes
  get '/signup' => 'users#new', as: :signup # creates a new user
  post '/users' => 'users#create' # the action of submitting the new user form
  get '/users/profile' => 'users#profile', as: :user_profile # logged in individual users profile

  # Bathroom Routes
  get '/bathrooms' => 'bathrooms#index', as: :bathroom_index # shows all bathrooms
  get '/bathrooms/search' => 'bathrooms#search', as: :bathroom_search # UNNECESSARY
  get '/bathrooms/new' => 'bathrooms#new', as: :create_bathroom # make a new bathroom
  post '/bathrooms' => 'bathrooms#create' # creates a bathroom
  delete '/bathrooms/:id' => 'bathrooms#destroy' # destroys a specific bathroom
  # USERS SHOULD NOT BE ABLE TO DELETE BATHROOMS
  # SHOULD SEND A NOTICE TO THE DBA TO DELETE IT LOL

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
