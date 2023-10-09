import React from 'react';
import './bgMenuChef.css'

const bgMenuChef = () => {
  return (
    <div className="bgMenuChef">
      <div className="contents flex">
        <div><img src="/images/bgMenu_chef.jpg" alt="XSCNT" /></div>
        <div>
            <div><h2>Đảm Bảo Chất Lượng</h2></div>
            <div><span style={{fontWeight: 'bold'}}>-----------------------------------------------------------------------&thinsp;&loz;&diams;&nabla;&diams;&loz;&thinsp;-----------------------------------------------------------------------</span></div>
            <div style={{fontSize: '20px', textAlign: 'justify', marginTop: '10px'}}>
            Chúng tôi cam kết mang đến cho quý khách hàng những món ăn tươi ngon, được chế biến từ nguyên liệu chất lượng cao, tuân thủ nghiêm ngặt các tiêu chuẩn vệ sinh an toàn thực phẩm. Sự an toàn và sức khỏe của quý khách hàng luôn được đặt lên hàng đầu trong mọi bước đi của chúng tôi.
            </div>
        </div>
        
        {/* <div className="flex between">
          <div>
            <i className="fa-regular fa-calendar"></i>
            <span>&ensp;Khởi chiếu</span>
            <br />&emsp;&ensp;23/06/2023
          </div>
          <div>
            <i className="fa-regular fa-clock"></i>
            <span>&ensp;Thời lượng </span>
            <br />&emsp;&ensp; 109 phút
          </div>
          <div>
            <i className="fa-solid fa-user-check"></i>
            <span>&ensp;Giới hạn tuổi</span>
            <br />&emsp;&ensp; Không
          </div>
        </div> */}
      </div>
      {/* <div className="actor">
        <div><span>Diễn viên:</span>
          <br /> Leah Lewis, Mamoudou Athie
        </div>
        <div><span>Đạo diễn:</span>
          <br /> Peter Sohn
        </div>
        <div><span>Nhà sản xuất:</span>
          <br /> Denise Ream
        </div>
      </div> */}
    </div>
  );
}

export default bgMenuChef;
