var vid;
var videos =[];
var video_info =[];

var favorites_lovalstorage = JSON.parse(localStorage.getItem('favorites'));
console.log(favorites_lovalstorage);

var favorites;

if (favorites_lovalstorage) {
    favorites = favorites_lovalstorage;
    renderVideos(favorites, 'favorites');
}   else {
    favorites = [];
}

renderVideos(favorites, 'favorites');


$.when(Youtube.getLastVideos()).then (function (resault) {
    videos = resault.items;

    renderVideos(videos, 'last');
    $('#last').on('click', '.watch', function () {

        $('#video-watch').modal('show');
        var index = $(this).parent().data('index');
        vid = videos[index].id;
        console.log(vid);
        var iframe = '<iframe width="415" height="300" src="https://www.youtube.com/embed/' + vid + '" frameborder="0" allowfullscreen></iframe>';
        console.log(iframe);
        $('.modal-body').html(iframe);
        var title = videos[index].snippet.title;
        $('.modal-title').html(title);
        var author = "Author: " + videos[index].snippet.channelTitle;
        $('.modal-footer-author').html(author);
        var date = "Date: " + moment(videos[index].snippet.publishedAt).format('DD MMMM YYYY, h:mm:ss');
        $('.modal-footer-date').html(date);
        $.when(youtube_info.getvideodetails()).then(function (info_resault) {
            video_info = info_resault.items;
            console.log(video_info);
        var viewed = "Viewed: " + video_info[0].statistics.viewCount;
        $('.modal-footer-viewed').html(viewed);
        var liked = "Liked: " + video_info[0].statistics.likeCount;
        $('.modal-footer-liked').html(liked);
        var disliked = "Disliked: " + video_info[0].statistics.dislikeCount;
        $('.modal-footer-disliked').html(disliked);

        });

        $('#favorites').on('click', '.watch', function () {

            $('#video-watch').modal('show');
            var index = $(this).parent().data('index');
            var vid = videos[index].id;
            var iframe = '<iframe width="480" height="320" src="https://www.youtube.com/embed/' + vid + '" frameborder="0" allowfullscreen></iframe>';
            console.log(iframe);
            $('.modal-body').html(iframe);
            var title = favorites[index].snippet.title;
            $('.modal-title').html(title);
            var author = "Author: " + favorites[index].snippet.channelTitle;
            $('.modal-footer-author').html(author);
            var date = "Date: " + moment(favorites[index].snippet.publishedAt).format('DD MMMM YYYY, h:mm:ss');
            $('.modal-footer-date').html(date);

        });


        $('#last').on('click', '.favorites', function () {
            var index = $(this).parent().data('index');
            var vid = videos[index];
            favorites.push(vid);

            renderVideos(favorites, 'favorites');
            var favorites_string = JSON.stringify(favorites);
            localStorage.setItem('favorites', favorites_string);
        });


    });


});

function renderVideos(videos, id) {
    $('#' + id + ' .row').html('');
    videos.forEach(function (data, index) {
        //console.log(data);


        var date = moment(data.snippet.publishedAt).format('DD MMMM YYYY, h:mm:ss');

        var video = '<div class="col-sm-6 col-md-4">' +
            '<div class="thumbnail">' +
            '<img src="' + data.snippet.thumbnails.high.url + '" alt="...">' +
            '<div class="caption">' +
            '<h3>' + data.snippet.title + '</h3>' +
            '<h3>' + data.snippet.channelTitle + '</h3>' +
            '<h3>' + date + '</h3>' +
            '<p>' + data.snippet.description.slice(0, 100) + '</p>' +
            '<p data-index="' + index + '"><a href="#" class="btn btn-primary watch" role="button">Watch</a>' +
            '<a href="#" class="btn btn-default favorites" role="button">Add to Favorites</a></p>' +
            '</div>' +
            '</div>' +
            '</div>';
        console.log(id);


        $('#' + id + ' .row').append(video);

    });
};

//добавить автора и дату и 25 видео и колесико загрузки
