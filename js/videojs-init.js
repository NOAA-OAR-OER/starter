window.onload = function () {
    setTimeout(function(){ 
        var players = videojs.getPlayers()
        Object.keys(players).forEach(function (item) {
            videojs(item).videoJsResolutionSwitcher()
        })     
        window.videojs = videojs
        $('audio,video').bind('play', function() {
            activated = this
            $('audio,video').each(function() {
                if(this != activated) this.pause()
            })
        })
    }, 1000)
}    