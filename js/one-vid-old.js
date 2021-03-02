//play only one video at a time script
jwplayer('player1').on('play',function(){
  playOnlyOne('player1');
});
jwplayer('player2').on('play',function(){
  playOnlyOne('player2');
});
jwplayer('player3').on('play',function(){
  playOnlyOne('player3');
});
jwplayer('player4').on('play',function(){
  playOnlyOne('player4');
});

function playOnlyOne(playThis) {
  for (i=0; i<document.getElementsByClassName('jwplayer').length;i++) {
    if (document.getElementsByClassName('jwplayer')[i].id != playThis) {
      jwplayer(document.getElementsByClassName('jwplayer')[i]).play(false);
    }
  }
}