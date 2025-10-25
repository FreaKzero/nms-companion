import { SupplyState } from '@/ipc/supplyIPC';

import { DrillIcon, Package2Icon, Trash2Icon, PencilRulerIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { confirmModal } from '../components/ConfirmModal';
import { FormDropdown } from '../components/FormDropdown';
import { FormInput } from '../components/FormInput';
import Loader from '../components/Loader';
import materials from '../mappings/materials.json';
import { useAutoRefreshStore } from '../stores/useRefreshStore';
import useSupplyStore from '../stores/useSupplyStore';
interface IconProgressProps {
  progress: number;
}

const IconProgress: React.FC<IconProgressProps> = ({ progress }) => {
  let color = 'linear-gradient(to top, #166534, #15803d)';

  if (progress >= 100) {
    color = 'linear-gradient(to top, #b45309, #d97706)';
  }

  return (
    <div
      className='w-15 h-15 rounded-lg flex items-center justify-center bg-gray-700'
      style={{
        backgroundImage: color,
        backgroundSize: `${progress}% 100%`,
        backgroundRepeat: 'no-repeat'
      }}
    >
      {progress < 100
        ? (
          <div className='text-white flex flex-col items-center'>
            <DrillIcon />
          </div>
          )
        : (
          <div className='text-white flex flex-col items-center'>
            <Package2Icon />
          </div>
          )}
    </div>
  );
};

interface SupplyFormProps {
  initialData?: SupplyState;
  onSubmitCallback?: () => void;
}

const SupplyForm: React.FC<SupplyFormProps> = ({ initialData, onSubmitCallback }) => {
  const add = useSupplyStore((s) => s.add);
  const update = useSupplyStore((s) => s.update);

  const { handleSubmit, register, reset, formState: { errors }, control, setValue } = useForm<SupplyState>({
    defaultValues: initialData || {}
  });

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => setValue(key as keyof SupplyState, value));
    }
  }, [initialData]);

  const onSubmit = (data: SupplyState) => {
    if (initialData?.id) {
      data.id = initialData.id;
      update(data.id, data);
    } else {
      data.LastPickup = new Date().toISOString();
      add(data);
    }
    reset();
    onSubmitCallback?.();
  };

  const handleCancel = () => {
    reset();
    onSubmitCallback();
  };

  return (
    <div className='bg-gray-900 text-white rounded-lg shadow-md p-4 w-full mb-5'>
      <form
        action='#'
        method='POST'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex gap-5'>
          <div>
            <FormDropdown
              label='Material'
              name='Material'
              control={control}
              options={materials}
              placeholder='Search Material'
              writeable
              required='Tag is required'
            />
            {errors.Material && (
              <p className='text-indigo-500 text-sm mt-1'>
                {errors.Material.message}
              </p>
            )}
          </div>
          <div>
            <FormInput id='BaseName' label='Base Name' register={register('BaseName', { required: 'Base Name is required' })} />
            {errors.BaseName && (
              <p className='text-indigo-500 text-sm mt-1'>
                {errors.BaseName.message}
              </p>
            )}
          </div>
          <div>
            <FormInput id='ExtractionPerHour' label='Extraction per Hour' register={register('ExtractionPerHour', { required: 'ExtractionPerHour is required', validate: (value) => !isNaN(value) || 'Only numbers are allowed' })} />
            {errors.ExtractionPerHour && (
              <p className='text-indigo-500 text-sm mt-1'>
                {errors.ExtractionPerHour.message}
              </p>
            )}
          </div>
          <div>
            <FormInput id='Storage' label='Storage' register={register('Storage', { required: 'Storage is required', validate: (value) => !isNaN(value) || 'Only numbers are allowed' })} />
            {errors.Storage && (
              <p className='text-indigo-500 text-sm mt-1'>
                {errors.Storage.message}
              </p>
            )}
          </div>

          <button className='button self-end p-2 pl-5 pr-5'>Save</button>
          {initialData && <button type='button' className='button2 self-end p-2 pl-5 pr-5' onClick={() => handleCancel()}>Cancel</button>}
        </div>
      </form>
    </div>
  );
};

const SupplyDepot = (supply: SupplyState & { onEdit: (s: SupplyState) => void }) => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(supply.LastPickup).getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  const extracted = diffHours * supply.ExtractionPerHour;
  const progress = Math.min((extracted / supply.Storage) * 100, 100);
  const pickup = useSupplyStore((s) => s.pickup);
  const deleteDepot = useSupplyStore((s) => s.delete);

  const handleDelete = async (id: number) => {
    if (await confirmModal('Do you really want to delete this Supply Depot?')) {
      await deleteDepot(id);
    }
  };

  return (
    <li className='flex items-start gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transtion-all duration-200 rounded-lg'>
      <div className='w-15 h-15 rounded-lg flex items-center justify-center bg-gradient-to-t from-green-900 to-green-700'>
        <IconProgress progress={progress} /><br />
      </div>
      <div className='flex flex-col flex-1 text-sm text-gray-900 dark:text-gray-100'>
        <p className='line-clamp-2 text-xl font-nms'>{supply.Material} • {supply.BaseName}</p>
        <div className='flex justify-between'>
          <div>
            <p className='text-gray-600 dark:text-gray-400 text-xs'><strong>Extraction:</strong><span className='ml-[10px]'>{supply.ExtractionPerHour} per Hour</span></p>
            <p className='text-gray-600 dark:text-gray-400 text-xs'><strong>Storage:</strong> <span className='ml-[21px]'>{Math.floor(extracted)} / {supply.Storage}</span></p>
          </div>
          <div className='self-end flex gap-2'>
            <button className='cursor-pointer' onClick={() => pickup(supply.id)}>
              <Package2Icon size='20' className='text-indigo-400 hover:text-indigo-500 transition duration-250' />
            </button>
            <button className='cursor-pointer' onClick={() => supply.onEdit(supply)}>
              <PencilRulerIcon size={20} className='text-indigo-400 hover:text-indigo-500 transition duration-250' />
            </button>
            <button
              className='cursor-pointer'
              onClick={() => handleDelete(supply.id)}
            >
              <Trash2Icon size='20' className='text-red-400 hover:text-red-500 transition duration-250' />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

function SupplyPage () {
  const getAll = useSupplyStore((s) => s.getAll);
  const entries = useSupplyStore((s) => s.entries);
  const loading = useSupplyStore((s) => s.loading);
  const stopAutoRefresh = useAutoRefreshStore((s) => s.stop);
  const [search, setSearch] = useState('');
  const [editingSupply, setEditingSupply] = useState<SupplyState | null>(null);

  useEffect(() => {
    stopAutoRefresh();
    getAll();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      search.trim() !== '' ? getAll(search) : getAll();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div>
      {loading && <Loader message='Loading Supply Depots ...' />}
      <SupplyForm
        initialData={editingSupply || undefined}
        onSubmitCallback={() => setEditingSupply(null)}
      />
      <div className='bg-gray-900 text-white rounded-lg shadow-md p-4 w-full'>
        <FormInput
          id='search'
          label='Search'
          placeholder='Search ...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          className='w-full mb-8'
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 divide-y divide-gray-800'>
          {entries.map((supply) => <SupplyDepot key={`supply-${supply.id}`} {...supply} onEdit={setEditingSupply} />)}
        </div>
      </div>
    </div>
  );
}

export default SupplyPage;
