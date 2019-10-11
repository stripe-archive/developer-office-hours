class CreateWebhookEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :webhook_events do |t|
      t.string :source
      t.json :data
      t.integer :state, default: 0
      t.string :external_id
      t.string :processing_errors

      t.timestamps
    end
    add_index :webhook_events, :external_id
    add_index :webhook_events, [:source, :external_id]
  end
end
