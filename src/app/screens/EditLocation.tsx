import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../components/Loader';
import LocationForm from '../components/LocationForm';
import useListStore from '../stores/useListStore';

function EditLocationPage () {
  const { id } = useParams();
  const getId = useListStore((s) => s.getId);
  const edit = useListStore((s) => s.edit);
  const loading = useListStore((s) => s.loading);
  useEffect(() => {
    getId(Number(id));
  }, [id]);

  return (
    <div>
      {loading && <Loader message='Loading Location ...' />}
      <LocationForm editItem={edit} />
    </div>
  );
}

export default EditLocationPage;
