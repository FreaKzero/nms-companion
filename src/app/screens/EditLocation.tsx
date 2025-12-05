import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../components/Loader';
import LocationForm from '../components/LocationForm';
import useListStore from '../stores/useLocationStore';

function EditLocationPage () {
  const { id } = useParams();
  const getEdit = useListStore((s) => s.getEdit);
  const edit = useListStore((s) => s.edit);
  const loading = useListStore((s) => s.loading);
  useEffect(() => {
    getEdit(Number(id));
  }, [id]);

  return (
    <div>
      {loading && <Loader message='Loading Location ...' />}
      <LocationForm editItem={edit} />
    </div>
  );
}

export default EditLocationPage;
