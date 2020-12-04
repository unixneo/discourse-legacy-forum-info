# name: discourse-legacy-forum-info
# about: plugin to show migrated legacy thread id in topics
# version: 0.0.7
# date: 4 December 2020
# authors: Neo, spirobel
# url: https://github.com/unixneo/discourse-legacy-forum-info

enabled_site_setting :discourse_legacy_forum_info_enabled

register_asset "stylesheets/common/basic-import-id.scss"

after_initialize do
  add_to_serializer(:topic_view, :custom_fields, false) {
    object.topic.custom_fields
  }
end
