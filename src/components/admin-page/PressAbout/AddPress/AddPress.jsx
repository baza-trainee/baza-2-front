'use client';

import { useCallback, useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { createNewArticle } from '@/src/api/articles';
import stateUseAlert from '@/src/state/stateUseAlert';
import SectionAdmin from '../../SectionAdmin/SectionAdmin';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import Loader from '@/src/components/shared/loader/Loader';
import PressForm from '../PressForm/PressForm';

export default function AddPress() {
  const router = useRouter();
  const open = stateUseAlert((state) => state.open);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    router.replace('/admin/press-about');
  });

  // Запит на створення нової статті
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return createNewArticle(data);
    },
    onSuccess: () => {
      setModalOpen(true);
    },
    onError: () => {
      open('error', false);
    },
  });

  return (
    <SectionAdmin title={'Додати статтю'}>
      <PressForm hendleMutate={mutate}/>

      {isPending && <Loader />}

      <AdminModal
        isOpen={modalOpen}
        handleCallback={closeModal}
        title={'Статтю успішно додано'}
        btn={true}
      ></AdminModal>

      <UseAlert />
    </SectionAdmin>
  );
}
