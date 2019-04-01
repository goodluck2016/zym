var cartObj = {
  init: function() {
    var _this = this;
    _this.bindEvent();
  },
  bindEvent:function() {
    var _this = this;
    //全选
    $('.checkAll').on('click',function(){
      $('.data-table').find('input:checkbox').prop('checked',  $(this).prop('checked'));
      _this.isCheckAll();
      _this.sum();
    });
    //单个选中
    $('.checkboxItem').on('click',function(){
      _this.isCheckAll();
      _this.sum();
    });
    //加
    $('.plus').on('click',function(){
      var num = parseInt($(this).prev('.number').val());
      var itemPrice = parseFloat($(this).parent('.bd-number').parent('.good-item').find('.itemPrice').find('b').html());
      num++;
      $(this).prev('.number').val(num++);
      _this.sum();
    });
    //减
    $('.minus').on('click',function(){
      var num = parseInt($(this).next('.number').val());
      var itemPrice = parseFloat($(this).parent('.bd-number').parent('.good-item').find('.itemPrice').find('b').html());
      if(num > 1){
        num--;
        $(this).next('.number').val(num);
      } else if(num===1) {
        $(this).next('.number').val(1);
        _this.tipsBox('亲，数量不能再少啦');
      } else {
        $(this).next('.number').val(num);
      } 
      _this.sum();
    });
    //输入数量
    $('input[type=number]').change(function(){
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
    $('.delBtn').on('click',function(){
      $(this).parent('.bd-operate').parent('.good-item').remove();
      var selectedLen = $('.good-item').find('.bd-check').find('input:checked').length;
      if(selectedLen === 0){
        _this.nogoods();   
      }
      _this.sum();      
    });
    //删除所有
    $('.delAllBtn').on('click',function(){
      var allCheck = $(this).parent('.ft-del').prev('.ft-check').find('input[type=checkbox]').is(':checked');
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
      if(isCheck){
        var num = parseInt($(this).val()),
            itemPrice = parseFloat($(this).parent('.bd-number').parent('.good-item').find('.itemPrice').find('b').html());
        sumNum += num; 
        itemSum = (num*itemPrice).toFixed(2);
        $('.ft-selectedGoods').find('b').html(sumNum);
        $(this).parent('.bd-number').next('.itemSum').find('b').html(itemSum);
        sum += parseFloat(itemSum);
      } else {
        var num = parseInt($(this).val()),
            itemPrice = parseFloat($(this).parent('.bd-number').parent('.good-item').find('.itemPrice').find('b').html());
        itemSum = (num*itemPrice).toFixed(2);
        $(this).parent('.bd-number').next('.itemSum').find('b').html(itemSum);
      }    
      $('.ft-totalPrice').find('b').html(sum.toFixed(2));
    });
  },
  //判断是否全选
  isCheckAll: function() {    
    var len = $('.good-item').length,
        selectedLen = $('.good-item').find('.bd-check').find('input:checked').length;
    if(len === selectedLen){
      $('.data-table').find('.checkAll').prop('checked', true);
    } else {
      $('.data-table').find('.checkAll').prop('checked', false);
    }
    if(selectedLen > 0){
      $('.ft-totalPrice a').attr('class', 'buyBtn');
    }else{
      $('.ft-totalPrice a').attr('class', 'disable');
      $('.ft-selectedGoods').find('b').html(0);
    }
  }, 
  nogoods: function() {
    $('.ft-selectedGoods').find('b').html(0);
    $('.ft-totalPrice').find('b').html('0.00'); 
    $('.checkAll').prop('checked', false); 
    $('.ft-totalPrice a').attr('class', 'disable');
  },
  tipsBox: function(str) {
    $('.tipsBox').show().html(str);
    setTimeout(function(){$('.tipsBox').hide();},2000);
    return false;
  }
}
cartObj.init();