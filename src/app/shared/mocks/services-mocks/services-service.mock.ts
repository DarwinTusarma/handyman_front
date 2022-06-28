import { of } from "rxjs";
import { servicesMock } from "../service.mock"

export class ServicesServiceMock {
    getById = (id: bigint) => {
        return of(servicesMock.find(s => s.id === id));
    }

    validateServiceById = (id: bigint) => {
        return of(servicesMock.some(s => s.id === id));
    }
}