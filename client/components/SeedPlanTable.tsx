import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Edit2, Save, X } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  products: string[];
  previousYearUnits: number;
  currentYearUnits: number;
}

interface SeedPlanTableProps {
  customers: Customer[];
  onUpdateUnits: (customerId: string, newUnits: number) => void;
}

export function SeedPlanTable({ customers, onUpdateUnits }: SeedPlanTableProps) {
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const handleEditStart = (customerId: string, currentValue: number) => {
    setEditingCell(customerId);
    setTempValue(currentValue.toString());
  };

  const handleEditSave = (customerId: string) => {
    const newValue = parseInt(tempValue);
    if (!isNaN(newValue) && newValue >= 0) {
      onUpdateUnits(customerId, newValue);
    }
    setEditingCell(null);
    setTempValue('');
  };

  const handleEditCancel = () => {
    setEditingCell(null);
    setTempValue('');
  };

  const getVarianceColor = (current: number, previous: number) => {
    if (current > previous) return 'text-green-600';
    if (current < previous) return 'text-red-600';
    return 'text-gray-600';
  };

  const getVariancePercentage = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const variance = ((current - previous) / previous) * 100;
    return variance > 0 ? `+${variance.toFixed(1)}%` : `${variance.toFixed(1)}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Seed Product Demand Plan</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage customer seed product allocations for the current sales year
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prev. Yr Units
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Yr Units
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variance
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {customer.products.map((product, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                  {customer.previousYearUnits.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {editingCell === customer.id ? (
                    <div className="flex items-center justify-end space-x-2">
                      <Input
                        type="number"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-20 text-right"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleEditSave(customer.id);
                          if (e.key === 'Escape') handleEditCancel();
                        }}
                        autoFocus
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditSave(customer.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleEditCancel}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end space-x-2">
                      <span className="text-sm text-gray-900">
                        {customer.currentYearUnits.toLocaleString()}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditStart(customer.id, customer.currentYearUnits)}
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span
                    className={`text-sm font-medium ${getVarianceColor(
                      customer.currentYearUnits,
                      customer.previousYearUnits
                    )}`}
                  >
                    {getVariancePercentage(customer.currentYearUnits, customer.previousYearUnits)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditStart(customer.id, customer.currentYearUnits)}
                    className="text-brand-600 hover:text-brand-700"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Showing {customers.length} customers</span>
          <div className="flex space-x-4">
            <span>
              Total Current Units:{' '}
              <span className="font-medium text-gray-900">
                {customers.reduce((sum, c) => sum + c.currentYearUnits, 0).toLocaleString()}
              </span>
            </span>
            <span>
              Total Previous Units:{' '}
              <span className="font-medium text-gray-900">
                {customers.reduce((sum, c) => sum + c.previousYearUnits, 0).toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
