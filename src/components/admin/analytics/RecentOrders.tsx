'use client';

export default function RecentOrders() {
  const orders = [
    { id: "#2491", customer: "Sophia Reynolds", status: "Preparing", total: "$28.50", items: 3 },
    { id: "#2490", customer: "James Cooper", status: "Ready", total: "$12.00", items: 1 },
    { id: "#2489", customer: "Emily Chen", status: "Completed", total: "$45.20", items: 5 },
    { id: "#2488", customer: "Marcus Johnson", status: "Completed", total: "$18.75", items: 2 },
    { id: "#2487", customer: "Olivia Smith", status: "Cancelled", total: "$15.00", items: 2 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Preparing": return "bg-orange-50 text-orange-600 border-orange-100";
      case "Ready": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Completed": return "bg-green-50 text-green-700 border-green-100";
      case "Cancelled": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100 shadow-sm w-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black tracking-tight text-[#111111] uppercase">Recent Orders</h3>
        <button className="text-[10px] font-bold text-[#FFAC00] uppercase tracking-widest hover:text-[#111111] transition-colors">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-4 pt-2 font-bold uppercase tracking-widest text-gray-400 text-[10px]">Order ID</th>
              <th className="pb-4 pt-2 font-bold uppercase tracking-widest text-gray-400 text-[10px]">Customer</th>
              <th className="pb-4 pt-2 font-bold uppercase tracking-widest text-gray-400 text-[10px]">Status</th>
              <th className="pb-4 pt-2 font-bold uppercase tracking-widest text-gray-400 text-[10px]">Items</th>
              <th className="pb-4 pt-2 font-bold uppercase tracking-widest text-gray-400 text-[10px] text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="group hover:bg-[#FAFAFA] transition-colors">
                <td className="py-4 text-xs font-black tracking-widest text-[#111111]">{order.id}</td>
                <td className="py-4 text-sm font-bold text-gray-600">{order.customer}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 text-xs font-bold text-gray-500">{order.items}</td>
                <td className="py-4 text-sm font-black text-[#111111] text-right">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
