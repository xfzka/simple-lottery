let prizeList=[];let lotteryInterval=null;let lastItem=null;const flashSpeed=8;const bgImageCount=11;$('#prizePoolText').attr('placeholder',"铅笔 10\r\n橡皮 5\r\n100元 0");function clearPagePrizePool(){$('#prizePool').html('');prizeList=[];}
function autoSetColumns(prizeItemCount){let columnCount='';if(prizeItemCount%3===0){columnCount='three';}else{columnCount='four';}
$('#prizePool').removeClass().addClass(`ui ${columnCount} column grid`);}
function setPrizePool(){const warningText='确定要清空奖池吗？如果确定请继续点击【保存设置】按钮。';let prizePoolText=$('#prizePoolText').val();if(prizePoolText.trim().length==0){$('#prizePoolText').val(warningText);return false;}else if(prizePoolText==warningText){localStorage.setItem('prizePoolText','');return true;}
clearPagePrizePool();let prizeItemCount=0;for(const prizeItem of prizePoolText.split('\n')){if(prizeItem.trim().length==0){continue}
let[prizeName,awardWeight]=prizeItem.split(' ');addPrize(prizeName,awardWeight);prizeItemCount+=1}
autoSetColumns(prizeItemCount);localStorage.setItem('prizePoolText',prizePoolText);}
function setHeader(){const showTitleIcon=$('[name="showTitleIcon"]').is(":checked");const showTitleText=$('[name="showTitleText"]').is(":checked");const titleText=$('[name="titleText"]').val().trim();localStorage.setItem('showTitleIcon',showTitleIcon);localStorage.setItem('showTitleText',showTitleText);localStorage.setItem('titleText',titleText);if(showTitleIcon){$('#title-icon').show();}else{$('#title-icon').hide();}
if(showTitleText){$('#title-text').show();}else{$('#title-text').hide();}
$('#title-text').text(titleText);if(titleText.length==0){$('#title-text').hide();}}
function showSetSettingsPanel(){$('#setPrizePool').modal({closable:true,onApprove:function(){setHeader();setPrizePool();return true;},}).modal('show');}
function addPrizeToPage(prizeName){let html=`<div class="column">
                    <div class="ui segment" data-name="${prizeName}">
                        <h2>${prizeName}</h2>
                    </div>
                </div>`;$('#prizePool').append(html);}
function addPrize(prizeName,awardWeight){let tmpAwardWeight=parseInt(awardWeight)*10;if(typeof awardWeight!='string'){tmpAwardWeight=100}
for(var i=0;i<tmpAwardWeight;i++){prizeList.push(prizeName);}
addPrizeToPage(prizeName);}
function startLottery(){lotteryInterval=setInterval(function(){let randomPrizeName=prizeList[Math.floor(Math.random()*prizeList.length)];while(randomPrizeName==lastItem){randomPrizeName=prizeList[Math.floor(Math.random()*prizeList.length)];}
lastItem=randomPrizeName;let highlightedColor='inverted blue';$(`[data-name]`).removeClass(highlightedColor);$(`[data-name=${randomPrizeName}]`).addClass(highlightedColor).transition({animation:'pulse',duration:`${parseInt(1000/flashSpeed)*2}ms`});},parseInt(1000/flashSpeed))}
function stopLottery(){clearInterval(lotteryInterval);}
function showSetSkinPanel(){$('#setSkin').modal('show');}
function initSkin(){let genImg=function(imgNumber){return`<div class="column">
                    <div class="ui segment">
                        <img class="ui medium image" src="/background/${imgNumber}.jpg">
                    </div>
                </div>`}
for(let i=1;i<=bgImageCount;i++){$('#skinImgContainer').append(genImg(i));}
$('img').click(function(){let bgImgSrc=$(this).attr('src');$('body').css({'background-image':`url("${bgImgSrc}")`,'background-repeat':'repeat'});$('#setSkin .segment').removeClass('red');$(this).parent().addClass('red');localStorage.setItem('lastBgImage',bgImgSrc);});let lastBgImage=localStorage.getItem('lastBgImage');if(typeof lastBgImage==='string'&&lastBgImage.trim().length!==0){$('body').css({'background-image':`url("${lastBgImage}")`,'background-repeat':'repeat'});$(`img[src="${lastBgImage}"]`).parent().addClass('red');}}
function init(){$('#controlButton').click(function(){let startTitle='开始抽奖';let stopTitle='停止抽奖';let currentTitle=$(this).text();if(currentTitle==startTitle){startLottery();$(this).text(stopTitle)}else if(currentTitle==stopTitle){stopLottery();$(this).text(startTitle);}});$('.noneBg').click(function(){localStorage.removeItem('lastBgImage');$('body').css({'background-image':"",'background-repeat':""});$('#setSkin .segment').removeClass('red');})
const lastPrizePoolText=localStorage.getItem('prizePoolText');if(typeof lastPrizePoolText!=='string'||lastPrizePoolText.trim().length===0){showSetSettingsPanel();}else{$('#prizePoolText').val(lastPrizePoolText);setPrizePool();}
const showTitleIcon=localStorage.getItem("showTitleIcon");const showTitleText=localStorage.getItem("showTitleText");const titleText=localStorage.getItem("titleText");if(typeof showTitleIcon!=='string'||showTitleIcon==="true"){$('[name="showTitleIcon"]').prop("checked","checked");}
if(typeof showTitleText!=='string'||showTitleText==="true"){$('[name="showTitleText"]').prop("checked","checked");}
if(typeof titleText==='string'){$('[name="titleText"]').val(titleText);}else{$('[name="titleText"]').val('Who is the lucky person');}
setHeader();initSkin();$('.ui.checkbox').checkbox();}
init();