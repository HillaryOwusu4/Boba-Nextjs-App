'use client';

type OrderStatus = 'Preparing' | 'Ready' | 'Completed' | 'Cancelled' | 'Pending';

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const styles = {
    Preparing: 'bg-blue-50 text-blue-600 border-blue-100',
    Ready: 'bg-green-50 text-green-600 border-green-100',
    Completed: 'bg-gray-50 text-gray-400 border-gray-100',
    Cancelled: 'bg-red-50 text-red-600 border-red-100',
    Pending: 'bg-amber-50 text-amber-600 border-amber-100',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}>
      {status}
    </span>
  );
}
