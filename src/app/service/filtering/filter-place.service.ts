import {Injectable} from '@angular/core';
import {MapBounds} from '../../model/map/map-bounds';
import {CategoryDto} from '../../model/category.model';
import {Specification} from '../../model/specification/specification';
import {LatLngBounds} from '@agm/core';
import {FilterDiscountDtoModel} from '../../model/filtering/filter-discount-dto.model';
import {FilterPlaceDtoModel} from '../../model/filtering/filter-place-dto.model';
import {PlaceStatus} from '../../model/placeStatus.model';
import {DatePipe} from '@angular/common';
import {FilterDistanceDto} from '../../model/filtering/filter-distance-dto.model';
import {Location} from '../../component/map/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class FilterPlaceService {
  isCleared = true;
  mapBounds = new MapBounds();
  category: CategoryDto;
  specification: Specification;
  isNowOpen: boolean;

  discountMin = 0;
  discountMax = 100;
  distance: number;
  userMarkerLocation: Location = new Location();

  constructor(private datePipe: DatePipe) {
  }

  setCategoryName(name: string) {
    this.category = new CategoryDto();
    this.category.name = name;
  }

  setSpecName(name: string) {
    this.specification = new Specification();
    this.specification.name = name;
  }

  setMapBounds(latLngBounds: LatLngBounds) {
    this.mapBounds.northEastLat = latLngBounds.getNorthEast().lat();
    this.mapBounds.northEastLng = latLngBounds.getNorthEast().lng();
    this.mapBounds.southWestLat = latLngBounds.getSouthWest().lat();
    this.mapBounds.southWestLng = latLngBounds.getSouthWest().lng();
  }

  setDiscountBounds(discountMin: number, discountMax: number) {
    this.discountMin = discountMin;
    this.discountMax = discountMax;
    this.isCleared = false;
  }

  setIsNowOpen(isOpen: boolean) {
    this.isNowOpen = isOpen;
  }

  getFilters() {
    const discount = new FilterDiscountDtoModel(this.category, this.specification, this.discountMin, this.discountMax);
    const currentTime = this.isNowOpen ? this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss') : null;
    const distance = new FilterDistanceDto(this.userMarkerLocation.lat, this.userMarkerLocation.lng, this.distance);
    return new FilterPlaceDtoModel(PlaceStatus.APPROVED, this.mapBounds, discount, distance, null, currentTime);
  }

  clearFilter() {
    this.discountMin = 0;
    this.discountMax = 100;
    this.isCleared = true;
    this.isNowOpen = false;
    this.distance = null;
  }

  setDistance(distance: number) {
    distance > 0 ? this.distance = distance : this.distance = null;
  }

  setUserMarkerLocation(userMarkerLocation: Location) {
    this.userMarkerLocation = userMarkerLocation;
  }
}
