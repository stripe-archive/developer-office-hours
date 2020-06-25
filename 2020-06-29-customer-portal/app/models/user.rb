class User < ApplicationRecord
  attr_reader :password
  validates :password, length: { in: 6..4095, allow_nil: true }
  validates :session_token, presence: true

  before_validation(on: :create) do
    self.session_token ||= SecureRandom.hex
  end

  def self.find_by_auth(params)
    u = find_by(email: params[:email])
    return u if u && BCrypt::Password.new(u.password_digest).is_password?(params[:password])
  end

  def password=(raw)
    @password = raw
    self.password_digest = BCrypt::Password.create(raw)
  end
end
