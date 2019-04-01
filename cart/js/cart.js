$(function(){
  sum();
  checkAll();
  checkItem();
  plusFn();
  minusFn();
  delFn();
  delAll();
  nogoods();

  //总金额
  function sum(){
    var sum = 0,
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
  };

  //全选
  function checkAll(){
    $('.checkAll').on('click',function(){
      $('.data-table').find('input:checkbox').prop('checked',  $(this).prop('checked'));
      isCheckAll();
      sum();
    });
  };

  //单个商品勾选
  function checkItem(){
    $('.checkboxItem').on('click',function(){
      isCheckAll();
      sum();
    });
  };

  //判断是否全选
  function isCheckAll(){
    var len = $('.good-item').length,
        selectedLen = $('.good-item').find('.bd-check').find('input:checked').length;
        // console.log('len: ' + len + ', selectedLen: '+selectedLen);
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
  };

  //加
  function plusFn(){
    $('.plus').on('click',function(){
      var num = parseInt($(this).prev('.number').val());
      var itemPrice = parseFloat($(this).parent('.bd-number').parent('.good-item').find('.itemPrice').find('b').html());
      num++;
      $(this).prev('.number').val(num++);
      sum();
    }); 
  };

  //减
  function minusFn(){
    $('.minus').on('click',function(){
      var num = parseInt($(this).next('.number').val());
      var itemPrice = parseFloat($(this).parent('.bd-number').parent('.good-item').find('.itemPrice').find('b').html());
      if(num > 1){
        num--;
        $(this).next('.number').val(num);
      } else if(num===1) {
        $(this).next('.number').val(1);
        tipsBox('亲，数量不能再少啦');
      } else {
        $(this).next('.number').val(num);
      } 
      sum();
    });
  };

  //输入数量
  function inputFn(){
    $('input[type=number]').change(function(){
      var num = parseInt($(this).val()),
          itemPrice = parseFloat($(this).parent('.bd-number').parent('.good-item').find('.itemPrice').find('b').html());
      if(num >= 1){
        $(this).val(num);
      }else{
        $(this).val(1);
      }
      sum();
    });
  };

  //删除单个
  function delFn(){
    $('.delBtn').on('click',function(){
      $(this).parent('.bd-operate').parent('.good-item').remove();
      var selectedLen = $('.good-item').find('.bd-check').find('input:checked').length;
      if(selectedLen === 0){
        nogoods();   
      }
      sum();      
    });
  };

  //批量删除
  function delAll(){
    $('.delAllBtn').on('click',function(){
      var allCheck = $(this).parent('.ft-del').prev('.ft-check').find('input[type=checkbox]').is(':checked');
      if(allCheck){
        $('.good-list').empty();
      }
      nogoods(); 
    });
  };

  //初始化
  function nogoods(){
    $('.ft-selectedGoods').find('b').html(0);
    $('.ft-totalPrice').find('b').html('0.00'); 
    $('.checkAll').prop('checked', false); 
    $('.ft-totalPrice a').attr('class', 'disable');
  };

  //提示
  function tipsBox(str){
    $('.tipsBox').show().html(str);
    setTimeout(function(){$('.tipsBox').hide();},2000);
    return false;
  };
});