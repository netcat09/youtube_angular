var app = angular.module('youtube', ['ui.bootstrap']);
app.controller('VideosController', function ($scope, API) {

API.getMostPopularVideos().then(function (videos) {
    console.log(videos);
    $scope.videos = videos;
});

    $scope.videos = [];



    $scope.favorites = [];




});

app.directive('videoItem', function () {
    return {
        restrict: 'E',
        templateUrl: 'video-item.html'
    };

});

app.service('API', function ($http, $q) {
    return {
        getMostPopularVideos: function () {
            var key = 'AIzaSyALTCWvsRUOF9yCXf5Er8OPYH-y5a7kPUY';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'https://www.googleapis.com/youtube/v3/videos',
                params:{
                    part: 'snippet',
                    key : key,
                    chart: 'mostPopular',
                    maxResults: 50
                }
            }).then(function (data) {
                var y_videos = data.data.items;
                console.log(y_videos[0]);
                var  my_videos = y_videos.map(function (video, index) {
                    return {
                        title: video.snippet.title,
                        id: video.id,
                        description: video.snippet.description,
                        image: video.snippet.thumbnails.medium.url,
                        date: video.snippet.publishedAt,
                        author: video.snippet.channelTitle

                    }
                });
            d.resolve(my_videos);
                console.log(my_videos);
            });
        return d.promise

        }
    }
});