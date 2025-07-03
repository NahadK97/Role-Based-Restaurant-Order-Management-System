import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import KitchenMasterApp from './KitchenMaster/KitchenMasterApp';

const KitchenManager = () => {
  const { user } = useAuthContext();
  const restaurantId = user?.RID;

  return <KitchenMasterApp restaurantId={restaurantId} />;
};

export default KitchenManager;
