//play only one video at a time script - Cant handle more than 4 videos
jwplayer('player1').on('play',function(){
  playOnlyOne('player1');
});
if (document.getElementById('player2')) {
  jwplayer('player2').on('play',function(){
    playOnlyOne('player2');
  });
}
if (document.getElementById('player3')) {
  jwplayer('player3').on('play',function(){
    playOnlyOne('player3');
  });
}
if (document.getElementById('player4')) {
  jwplayer('player4').on('play',function(){
    playOnlyOne('player4');
  });
}
function playOnlyOne(playThis) {

  for (i=0; i<document.getElementsByClassName('jwplayer').length;i++) {
    if (document.getElementsByClassName('jwplayer')[i].id != playThis) {
      jwplayer(document.getElementsByClassName('jwplayer')[i]).play(false);
    }
  }
}
