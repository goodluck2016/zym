var cartObj = {
  data:[], // 购物车数据
  init: function() {
    var _this = this;
    _this.data = [
      {id:1, src:'images/0.jpg', name:'武林盟主第180代传人2019新款宝剑武侠版仗剑走天涯', params1:'主要颜色：金色', params2:'尺码：XL', oPrice:'189.00', sPrice:'69.00', num:1},
      {id:2, src:'images/1.jpg', name:"武林盟主第180代传人2019新款宝剑武侠版仗剑走天涯", params1:'主要颜色：透明色', params2:'尺码：L', oPrice:'398.00', sPrice:'96.00', num:1}
    ];
    _this.bindEvent();    
    _this.showList();
  },
  bindEvent:function() {
    var _this = this;
    //全选
    $('#data-table').on('click', '.checkAll', function(){
      $('#data-table').find('input:checkbox').prop('checked', $(this).prop('checked'));
      _this.isCheckAll();
      _this.sum();
    });
    //单个选中
    $('#data-table').on('click', '.checkboxItem', function(){
      _this.isCheckAll();
      _this.sum();
    });
    //加
    $('#data-table').on('click','.plus', function(){
      var num = parseInt($(this).prev('.number').val());
      var itemPrice = parseFloat($(this).parent('.bd-number').parent('.good-item').find('.itemPrice').find('b').html());
      num++;
      $(this).prev('.number').val(num++);
      _this.sum();
    });
    //减
    $('#data-table').on('click','.minus', function(){
      var num = parseInt($(this).next('.number').val());
      var itemPrice = parseFloat($(this).parent('.bd-number').parent('.good-item').find('.itemPrice').find('b').html());
      if(num > 1){
        num--;
        $(this).next('.number').val(num);
      } else if(num===1) {
        $(this).next('.number').val(1);
        _this.tipsBox($(this),'亲，数量不能再少啦');
      } else {
        $(this).next('.number').val(num);
      } 
      _this.sum();
    });
    //输入数量
    $('#data-table').on('change', 'input[type=number]', function(){
      var num = parseInt($(this).val()),
          itemPrice = parseFloat($(this).parent('.bd-number').parent('.good-item').find('.itemPrice').find('b').html());
      if(num >= 1){
        $(this).val(num);
      }else{
        $(this).val(1);
      }
      _this.sum();
    }); 
    //删除单个
    $('#data-table').on('click', '.delBtn', function(){
      $(this).parent('.good-item').remove();
      var selectedLen = $('.good-item').find('.bd-check').find('input:checked').length;
      if(selectedLen === 0){
        _this.nogoods();   
      }
      _this.sum();      
    });
    //删除所有
    $('.delAllBtn').on('click',function(){
      var allCheck = $(this).prev('.ft-check').find('input[type=checkbox]').is(':checked');
      if(allCheck){
        $('.good-list').empty();
      }
      _this.nogoods(); 
    }); 
  },
  //计算总数和总金额
  sum: function(){
    var _this = this, 
        sum = 0, 
        itemSum = 0, 
        num = 0, 
        sumNum = 0;
    $('input[type=number]').each(function(){
      var isCheck = $(this).parent('.bd-number').parent('.good-item').find('.bd-check').find('input[type=checkbox]').is(':checked');
      num = parseInt($(this).val());
      itemPrice = parseFloat($(this).parent('.bd-number').parent('.good-item').find('.itemPrice').html());
      itemSum = (num*itemPrice).toFixed(2);
      if(isCheck){     
        sumNum += num;         
        $('.ft-selectedGoods').find('b').html(sumNum);
        sum += parseFloat(itemSum);
      } 
      $(this).parent('.bd-number').next('.itemSum').html(itemSum);  
      $('.ft-totalPrice').find('b').html(sum.toFixed(2));
    });
  },
  //判断是否全选
  isCheckAll: function() {    
    var len = $('#data-table').find('.good-item').length,
        selectedLen = $('#data-table').find('.good-item').find('.bd-check').find('input:checked').length;
    if(len === selectedLen){
      $('#data-table').find('.checkAll').prop('checked', true);
    } else {
      $('#data-table').find('.checkAll').prop('checked', false);
    }
    if(selectedLen > 0){
      $('.ft-totalPrice a').attr('class', 'buyBtn');
    }else{
      $('.ft-totalPrice a').attr('class', 'disable');
      $('.ft-selectedGoods').find('b').html(0);
    }
  },
  //购物车列表展示
  showList: function() {
    var _this = this;
    var str = '';
    _this.data.forEach(function(item){
      str += '<li class="good-item">'
      str += '<label class="bd-check"><input type="checkbox" class="checkboxItem" /></label>'
      str += '<img class="info-pic" src="'+ item.src +'" />'
      str += '<a href="#"><div class="info-text">'+ item.name +'</div></a>'
      str += '<div class="info-parameter"><span>'+ item.params1 +'</span><span>'+ item.params2 +'</span></div>'
      str += '<div class="bd-price itemPrice">'+ item.sPrice +'</div>'
      str += '<div class="bd-number">'
      str += '<a href="javascript:;" class="minus">-</a><input type="number" class="inputNum number" min="1" value="'+ item.num +'" /><a href="javascript:;" class="plus">+</a>'
      str += '<div class="tipsBox">亲，这里是提示信息</div>'
      str += '</div>'
      str += '<div class="itemSum">69.00</div>'          
      str += '<a href="javascript:;" class="delBtn">删除</a>'
      str += '</li>'
    });
    $('#list').html(str);
  },
  nogoods: function() {
    $('.ft-selectedGoods').find('b').html(0);
    $('.ft-totalPrice').find('b').html('0.00'); 
    $('.checkAll').prop('checked', false); 
    $('.ft-totalPrice a').attr('class', 'disable');
  },
  tipsBox: function(obj,str) {
    var tipsBox = obj.parent().find('.tipsBox');
    tipsBox.show().html(str);
    setTimeout(function(){
      tipsBox.hide();
    }, 2000);  
    return false;
  }
}
$(function(){
  cartObj.init();
});

/*
【目标】功能齐全，思路清晰，代码优美、简洁、易维护、易扩展
【改进】
1) 语义化：合理使用标签
2) 代码简洁：减少div等嵌套
3) js选择器适当用id，结合class可提升效率（如第一层用id，之后再用.className，比都用.className 效率更优）
4) 多次使用同一选择器时可以申明一个公共变量，减少选择器选择次数
5) ...
*/