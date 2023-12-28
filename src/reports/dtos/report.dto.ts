import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

//? @Expose() -> Bu decorator, belirli sınıf özelliklerini dışa aktarmak veya serileştirmek için kullanılır. Bu, özellikle nesneleri belirli formata dönüştürmek veya sadece belirli özellikleri göndermek istediğimiz durumlarda kullanışlıdır.

//! ReportDto sınıfındaki '@Expose()' decorator'ları, sınıf özelliklerini dışa aktarmak amacıyla kullanılmıştır. Bu, genellikle bir nesneyi bir HTTP yanıtı olarak göndermeden önce veya bir nesneyi bir başka formata dönüştürmeden önce kullanılır.

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;
  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
