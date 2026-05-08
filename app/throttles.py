from rest_framework.throttling import AnonRateThrottle


class MurojaatThrottle(AnonRateThrottle):
    scope = 'murojaat'


class TekshiruvThrottle(AnonRateThrottle):
    scope = 'tekshiruv'


class CommentThrottle(AnonRateThrottle):
    scope = 'comment'


class LikeThrottle(AnonRateThrottle):
    scope = 'like'
