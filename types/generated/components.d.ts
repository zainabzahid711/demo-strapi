import type { Schema, Attribute } from '@strapi/strapi';

export interface RoomFeatures extends Schema.Component {
  collectionName: 'components_room_features';
  info: {
    displayName: 'features';
    icon: 'check';
    description: '';
  };
  attributes: {
    name: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'room.features': RoomFeatures;
    }
  }
}
