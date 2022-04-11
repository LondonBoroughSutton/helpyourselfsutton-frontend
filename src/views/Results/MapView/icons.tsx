import L from 'leaflet';
import activeIcon from '../../../assets/images/icons/maps/active-pin.svg';
import activityIcon from '../../../assets/images/icons/maps/activity-pin.svg';
import adviceIcon from '../../../assets/images/icons/maps/advice-pin.svg';
import appIcon from '../../../assets/images/icons/maps/app-pin.svg';
import clubIcon from '../../../assets/images/icons/maps/club-pin.svg';
import groupIcon from '../../../assets/images/icons/maps/group-pin.svg';
import helplineIcon from '../../../assets/images/icons/maps/helpline-pin.svg';
import informationIcon from '../../../assets/images/icons/maps/information-pin.svg';
import serviceIcon from '../../../assets/images/icons/maps/service-pin.svg';

export const ActiveMarker = L.icon({
  iconUrl: activeIcon,
  iconSize: [62, 88],
});
export const ActivityMarker = L.icon({
  iconUrl: activityIcon,
  iconSize: [50, 95],
});
export const AdviceMarker = L.icon({
  iconUrl: adviceIcon,
  iconSize: [50, 95],
});
export const AppMarker = L.icon({
  iconUrl: appIcon,
  iconSize: [50, 95],
});
export const ClubMarker = L.icon({
  iconUrl: clubIcon,
  iconSize: [50, 95],
});
export const GroupMarker = L.icon({
  iconUrl: groupIcon,
  iconSize: [50, 95],
});
export const HelplineMarker = L.icon({
  iconUrl: helplineIcon,
  iconSize: [50, 95],
});
export const InformationMarker = L.icon({
  iconUrl: informationIcon,
  iconSize: [50, 95],
});
export const ServiceMarker = L.icon({
  iconUrl: serviceIcon,
  iconSize: [50, 95],
});
