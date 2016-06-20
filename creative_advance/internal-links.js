'use strict';

var internalLinks = document.getElementsByClassName('mdl-js-internal-link');
for (var i = 0, l = internalLinks.length; i < l; i++) {
  internalLinks[i].addEventListener('click', function(e) {
    /**
     * `生きている`ノードリストを for 文内で削除すると、
     * ノードリストの要素数 length も動的に減少するので、
     * 条件式の判定で意図しない結果になりやすい
     * （高速化のためにも）`生きている`ノードリストを静的な配列に変換する
     */
    var array = [].slice.call(document.getElementsByClassName('is-active'));
    // リンク元の href 属性から、リンク先の ID 名を抽出する
    var targetIdName = this.href.split('#')[1];
    var panel = findAncestor(document.getElementById(targetIdName));
    var tab = document.getElementById(panel.id + '-tab');

    // イベントのアクションと伝搬を無効にする
    e.preventDefault();
    e.stopPropagation();

    // タブとタブパネルから is-active クラスを削除する
    for (var i = 0, l = array.length; i < l; i++) {
      array[i].classList.remove('is-active');
    }

    // タブとタブパネルに is-active クラスを付与する
    tab.classList.add('is-active');
    panel.classList.add('is-active');

    // リンク先の要素までスクロールする
    document.getElementById(targetIdName).scrollIntoView(true);
  }, false);
}

// リンク先の要素が属するタブパネルの要素（祖先要素）を取得する
function findAncestor(targetElement) {
  var ancestorClassName = 'mdl-layout__tab-panel';
  while (!targetElement.classList.contains(ancestorClassName))
    targetElement = targetElement.parentElement;
  return targetElement;
}
