class UsersController < ApplicationController
  def new
    if !params[:plan]
      redirect_to '/pricing'
    end
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
      customer = create_stripe_customer(@user)
      @session = create_checkout_session(customer, @user)
      @user.save!
      session[:token] = @user.session_token
      render :checkout
    else
      flash.now[:error] = @user.errors.full_messages
      render :new
    end
  end

  private

  def create_stripe_customer(user)
    customer = Stripe::Customer.create(
      email: @user.email,
      metadata: {
        selected_plan: @user.plan
      }
    )
    user.update!(stripe_customer_id: customer.id)
    customer
  end

  def create_checkout_session(customer, user)
    price = Stripe::Price.list(lookup_keys: [user.plan]).data.first

    Stripe::Checkout::Session.create({
      customer: customer.id,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      payment_method_types: ['card'],
      line_items: [{
        price: price.id,
        quantity: 1,
      }],
      mode: 'subscription',
    })
  end

  def user_params
    params.require(:user).permit(:email, :password, :plan)
  end
end
