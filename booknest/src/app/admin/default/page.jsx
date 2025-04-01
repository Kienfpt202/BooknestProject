import React from 'react';
import Sidebar from '@components/admin/default/Sidebar';
import Header from '@components/admin/default/Header';
import NoDataMessage from '@components/admin/default/NoDataMessage';

function Layout({ children }) {
    return (
      <div className="flex h-screen bg-[#F5F5F5]"> {/* Màu nền xám nhạt */}
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white"> {/* Nền trắng cho nội dung chính */}
            <div className="p-6">
              {children}
              <NoDataMessage />
            </div>
          </main>
        </div>
      </div>
    );
  }
  

export default Layout;