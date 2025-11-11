import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateCreditoDto {
  @ApiProperty({
    description: 'Id del usuario que crea el crédito',
    example: '1',
  })
  @IsNumber()
  idUsuario: number;              // FK usuario

  @ApiProperty({
    description: 'Id del cliente garante (si aplica)',
    example: '2',
  })
  @IsNumber()
  idClienteGarante?: number;      // FK cliente garante (puede ser opcional)
  
  @ApiProperty({
    description: 'Id del cliente que recibe el crédito',
    example: '3',
  })
  @IsNumber()
  idCliente: number;              // FK cliente
  
  @ApiProperty({
    description: 'Id del método de pago',
    example: '1',
  })
  @IsNumber()
  idMetodoPago: number;           // FK método de pago
  
  @ApiProperty({
    description: 'Número total de cuotas',
    example: '12',
  })
  @IsNumber()
  numCuotas: number;              // número total de cuotas
  
  @ApiProperty({
    description: 'Número de cuotas restantes',
    example: '12',
  })
  @IsNumber()
  numCuotasRestante?: number;     // opcional, lo puedes calcular = numCuotas
  
  @ApiProperty({
    description: 'Fecha de inicio del crédito (YYYY-MM-DD)',
    example: '2024-01-01',
  })
  @Type(() => Date)
  @IsDate()
  fechaInicio: Date;            // formato YYYY-MM-DD
  
  @ApiProperty({
    description: 'Fecha final del crédito (YYYY-MM-DD)',
    example: '2024-12-31',
  })
  @Type(() => Date)
  @IsDate()
  fechaFinal: Date;             // formato YYYY-MM-DD
  
  @ApiProperty({
    description: 'Id del estado del crédito',
    example: '1',
  })
  @IsNumber()
  idEstadoCredito?: number;       // estado inicial (ej. 1 = Activo)
  
  @ApiProperty({
    description: 'Garantía extendida del crédito (si aplica)',
    example: '2025-12-31',
  })
  @IsString()
  garantiaExtendidaCredito?: string;
  
  @ApiProperty({
    description: 'Garantía de tienda del crédito (si aplica)',
    example: '2025-12-31',
  })
  @IsString()
  garantiaTienda?: string;
  
  @ApiProperty({
    description: 'Período de pago del crédito',
    example: 'Mensual',
  })
  @IsString()
  periodoPago: string;            // Ejemplo: "Mensual", "Semanal"
  
  @ApiProperty({
    description: 'Tasa de interés aplicada al crédito',
    example: '5.5',
  })
  @IsString()
  interes: string;                // tasa en %
  
  @ApiProperty({
    description: 'Monto inicial del crédito',
    example: '1000.00',
  })
  @IsString()
  inicial: string;                // monto inicial
  
  @ApiProperty({
    description: 'Monto por cuota del crédito',
    example: '100.00',
  })
  @IsString()
  montoCuota: string;             // monto por cuota
  
  @ApiProperty({
    description: 'Monto total de la deuda',
    example: '1200.00',
  })
  @IsString()
  montoDeuda: string;             // deuda total
  
  @ApiProperty({
    description: 'Monto base de la deuda (si aplica)',
    example: '1000.00',
  })
  @IsString()
  montoDeudaBase?: string;        // opcional, depende de negocio
  
  @ApiProperty({
    description: 'Monto restante de la deuda',
    example: '1200.00',
  })
  @IsString()
  montoDeudaRestante?: string;    // opcional, al inicio = montoDeuda
  
  @ApiProperty({
    description: 'Id del comprobante asociado (si aplica)',
    example: '1',
  })
  @IsNumber()
  idComprobante?: number;         // opcional, si ya existe comprobante
  
  @ApiProperty({
    description: 'Id del registro que crea el crédito (si aplica)',
    example: '1',
  })
  @IsNumber()
  registrar?: number;             // opcional (ej. id del cajero/registro)
  
  @ApiProperty({
    description: 'Id de la tienda donde se crea el crédito',
    example: '1',
  })
  @IsNumber()
  idTienda: number;               // FK tienda
}
