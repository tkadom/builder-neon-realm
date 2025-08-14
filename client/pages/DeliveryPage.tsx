import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Truck, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  Calendar,
  Search,
  Filter,
  Download,
  Phone,
  Mail
} from 'lucide-react';

interface DeliveryOrder {
  id: string;
  customerName: string;
  customerContact: {
    phone: string;
    email: string;
    address: string;
  };
  orderNumber: string;
  products: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  status: 'pending' | 'in_transit' | 'delivered' | 'delayed' | 'failed';
  scheduledDate: string;
  actualDate?: string;
  trackingNumber?: string;
  driver?: string;
  truck?: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const deliveryOrders: DeliveryOrder[] = [
  {
    id: '1',
    customerName: 'Green Valley Farms',
    customerContact: {
      phone: '(555) 123-4567',
      email: 'orders@greenvalleyfarms.com',
      address: '1245 Rural Route 7, Farmington, IA 52556'
    },
    orderNumber: 'ORD-2024-001',
    products: [
      { name: 'Corn Seed Premium', quantity: 850, unit: 'bags' },
      { name: 'Soybean Elite', quantity: 420, unit: 'bags' }
    ],
    status: 'in_transit',
    scheduledDate: '2024-03-15',
    trackingNumber: 'TRK-885569741',
    driver: 'Mike Johnson',
    truck: 'Truck #47',
    priority: 'high'
  },
  {
    id: '2',
    customerName: 'Midwest Agricultural Co.',
    customerContact: {
      phone: '(555) 234-5678',
      email: 'logistics@midwestag.com',
      address: '3890 County Road 12, Cedar Falls, IA 50613'
    },
    orderNumber: 'ORD-2024-002',
    products: [
      { name: 'Corn Seed Standard', quantity: 560, unit: 'bags' }
    ],
    status: 'delivered',
    scheduledDate: '2024-03-14',
    actualDate: '2024-03-14',
    trackingNumber: 'TRK-885569742',
    driver: 'Sarah Chen',
    truck: 'Truck #23',
    priority: 'medium'
  },
  {
    id: '3',
    customerName: 'Prairie Fields LLC',
    customerContact: {
      phone: '(555) 345-6789',
      email: 'supplies@prairiefields.com',
      address: '7721 Highway 218, Vinton, IA 52349'
    },
    orderNumber: 'ORD-2024-003',
    products: [
      { name: 'Soybean Elite', quantity: 320, unit: 'bags' },
      { name: 'Wheat Winter', quantity: 180, unit: 'bags' }
    ],
    status: 'pending',
    scheduledDate: '2024-03-16',
    priority: 'medium'
  },
  {
    id: '4',
    customerName: 'Horizon Crop Solutions',
    customerContact: {
      phone: '(555) 456-7890',
      email: 'receiving@horizoncrops.com',
      address: '4512 Industrial Blvd, Waterloo, IA 50701'
    },
    orderNumber: 'ORD-2024-004',
    products: [
      { name: 'Corn Seed Premium', quantity: 920, unit: 'bags' },
      { name: 'Canola Premium', quantity: 240, unit: 'bags' }
    ],
    status: 'delayed',
    scheduledDate: '2024-03-15',
    trackingNumber: 'TRK-885569743',
    driver: 'Tom Wilson',
    truck: 'Truck #12',
    notes: 'Weather delay - roads closed due to storm',
    priority: 'urgent'
  },
  {
    id: '5',
    customerName: 'Central Plains Agriculture',
    customerContact: {
      phone: '(555) 567-8901',
      email: 'orders@centralplains.com',
      address: '9876 Farm Road 45, Ames, IA 50010'
    },
    orderNumber: 'ORD-2024-005',
    products: [
      { name: 'Corn Seed Standard', quantity: 1180, unit: 'bags' },
      { name: 'Soybean Standard', qty: 670, unit: 'bags' }
    ],
    status: 'in_transit',
    scheduledDate: '2024-03-17',
    trackingNumber: 'TRK-885569744',
    driver: 'Lisa Rodriguez',
    truck: 'Truck #31',
    priority: 'high'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'in_transit': return 'bg-blue-100 text-blue-800';
    case 'pending': return 'bg-gray-100 text-gray-800';
    case 'delayed': return 'bg-yellow-100 text-yellow-800';
    case 'failed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered': return <CheckCircle className="h-4 w-4" />;
    case 'in_transit': return <Truck className="h-4 w-4" />;
    case 'pending': return <Clock className="h-4 w-4" />;
    case 'delayed': return <AlertTriangle className="h-4 w-4" />;
    case 'failed': return <AlertTriangle className="h-4 w-4" />;
    default: return <Package className="h-4 w-4" />;
  }
};

export default function DeliveryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);

  const filteredOrders = deliveryOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    total: deliveryOrders.length,
    pending: deliveryOrders.filter(o => o.status === 'pending').length,
    in_transit: deliveryOrders.filter(o => o.status === 'in_transit').length,
    delivered: deliveryOrders.filter(o => o.status === 'delivered').length,
    delayed: deliveryOrders.filter(o => o.status === 'delayed').length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Delivery Management</h1>
            <p className="text-gray-600">Track and manage seed product deliveries</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-brand-600 hover:bg-brand-700">
              <Package className="h-4 w-4 mr-2" />
              Schedule Delivery
            </Button>
          </div>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{statusCounts.total}</p>
                </div>
                <Package className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-700">{statusCounts.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Transit</p>
                  <p className="text-2xl font-bold text-blue-600">{statusCounts.in_transit}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">{statusCounts.delivered}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Delayed</p>
                  <p className="text-2xl font-bold text-yellow-600">{statusCounts.delayed}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Search by customer name or order number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Delivery Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Orders</CardTitle>
            <CardDescription>Manage and track all delivery orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Order</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Products</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Scheduled</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tracking</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{order.orderNumber}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {order.customerContact.address.split(',')[0]}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          {order.products.map((product, idx) => (
                            <div key={idx} className="text-sm">
                              {product.quantity} {product.unit} {product.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status.replace('_', ' ')}</span>
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(order.scheduledDate).toLocaleDateString()}
                        </div>
                        {order.actualDate && (
                          <div className="text-xs text-green-600">
                            Delivered: {new Date(order.actualDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {order.trackingNumber ? (
                          <div className="text-sm">
                            <div className="font-mono text-brand-600">{order.trackingNumber}</div>
                            {order.driver && (
                              <div className="text-xs text-gray-500">{order.driver}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Not assigned</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedOrder(order)}
                          >
                            View Details
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Order Detail Modal/Panel (Simple version) */}
        {selectedOrder && (
          <Card className="border-brand-200">
            <CardHeader className="bg-brand-50">
              <div className="flex justify-between items-center">
                <CardTitle>Order Details - {selectedOrder.orderNumber}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedOrder(null)}>×</Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {selectedOrder.customerName}</div>
                    <div><strong>Phone:</strong> {selectedOrder.customerContact.phone}</div>
                    <div><strong>Email:</strong> {selectedOrder.customerContact.email}</div>
                    <div><strong>Address:</strong> {selectedOrder.customerContact.address}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Delivery Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Status:</strong> 
                      <Badge className={`ml-2 ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div><strong>Driver:</strong> {selectedOrder.driver || 'Not assigned'}</div>
                    <div><strong>Truck:</strong> {selectedOrder.truck || 'Not assigned'}</div>
                    <div><strong>Tracking:</strong> {selectedOrder.trackingNumber || 'Not available'}</div>
                    {selectedOrder.notes && (
                      <div><strong>Notes:</strong> {selectedOrder.notes}</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
