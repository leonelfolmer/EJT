"use strict";

var limit = 15;
var offset = 0;
var retrieve_content = function () {
    if (limit <= 0) {
        return;
    }
    $.ajax({
        dataType: 'json',
        url: 'http://www.stellarbiotechnologies.com/media/press-releases/json?limit=' + limit + '&offset=' + offset,
        success: function (data) {
            offset += limit;
            var len = data.news.length;
            if (len === 0) {
                limit = 0;
            }
            for (var i = 0; i < len; i++) {
                var tr;
                tr = $('<tr/>');
                tr.append("<td>" + data.news[i].title + "</td>");
                tr.append("<td>" + data.news[i].published + "</td>");
                $('table').append(tr);
            }
            $('#loading').css('display','none');
        }
    });
};

$(window).scroll(function () {
    if ($(window).scrollTop() === $(document).height() - $(window).height()) {
        retrieve_content();
        $('#loading').css('display','block');
    }
});

retrieve_content();