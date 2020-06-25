class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :plan
      t.string :stripe_customer_id
      t.string :session_token

      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :stripe_customer_id, unique: true
  end
end
