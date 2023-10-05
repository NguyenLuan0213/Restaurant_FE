import React from 'react';
import './bgMenu.css'

const bgMenu = () => {
  return (
    <div className="bgMenu flex">
      <div className="contents">
        <div><h2 style={{color: 'white', textAlign: 'center'}}>Thực Đơn Hấp Dẫn</h2></div>
        <div><span>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~&thinsp;&ordm;&ordm;&Omicron;&ordm;&ordm;&thinsp;~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></div>
        <div style={{fontWeight: '600', textAlign: 'justify'}}>
        Chúng tôi tự hào mang đến cho bạn những trải nghiệm ẩm thực độc đáo và hấp dẫn. Thực đơn của chúng tôi được thiết kế đặc biệt với sự kết hợp tinh tế của các nguyên liệu tươi ngon và phong cách nấu ẩm thực đa dạng. Từ những món khai vị hấp dẫn cho đến các món chính độc đáo, chúng tôi cam kết mang đến cho bạn một trải nghiệm ẩm thực không thể quên. Hãy để chúng tôi phục vụ và làm hài lòng vị giác của bạn.
        </div>
      </div>
    </div>
  );
}

export default bgMenu;
