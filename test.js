/**
 * Created by netcat09 on 16.11.16.
 */
var vid1;
var videos1 =[];




describe('Youtube', function () {
    this.timeout(5000);
    describe('API', function () {
        it('Получение последних видео работает', function (done) {
            $.when(Youtube.getLastVideos()).then(function (result) {
                done();
            })
        });
    });
    describe('API', function () {
        it('Колво > 0', function (done) {
            $.when(Youtube.getLastVideos()).then(function (result) {
                if (result.items.length > 0) {
                    done();
                }

            })
        });
    });
    describe('Id', function () {
        it('Информация по id получена', function (done) {
            $.when(Youtube.getLastVideos()).then (function (resault) {
                    videos1 = resault.items;
                    console.log(videos1);

                    for (var i = 0; i < maxvideo; i++) {
                        id = videos1[i].id;
                        console.log(id);
                        $.when(youtube_info.getvideodetails(id)).then(function (info_result) {
                            var numbers = 0;
                            console.log(info_result.items[0].statistics.viewCount);

                            if (info_result.items[0].statistics.viewCount) {
                            } else {
                                numbers++;
                                console.log(numbers);
                            }
                            if (numbers != maxvideo) {
                                done();
                            }
                        }
                    )}
                }
            )
        });
    })
});