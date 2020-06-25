require 'open-uri'

class EpisodesController < ApplicationController
  before_action :require_login!
  before_action :require_subscription!
  layout 'dashboard'

  def index
    @episodes = []
    url = 'http://feeds.backtracks.fm/feeds/indiehackers/indiehackers/feed.xml?1588905169'

    if current_user.subscription_status != 'canceled'
      open(url) do |rss|
        @episodes = RSS::Parser.parse(rss, false).items
      end
    end
  end
end
