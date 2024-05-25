<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('tblproducts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('imageSrc')->nullable();
            $table->timestamps();
        });

        DB::table('tblproducts')->insert([
            [
                'name' => 'Ferrari 488 GTB',
                'description' => 'The Ferrari 488 GTB is a mid-engine sports car produced by the Italian automobile manufacturer Ferrari.',
                'price' => 300000,
                'imageSrc' => 'https://www.topgear.com/sites/default/files/cars-car/carousel/2015/12/li3020386_u6a1613488.jpg?w=211&h=119'
            ],
            [
                'name' => 'Lamborghini Huracan',
                'description' => 'The Lamborghini Huracán is a sports car built by Lamborghini.',
                'price' => 250000,
                'imageSrc' => 'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/huracan/2023/model_chooser/huracan_evo_spyder_m.jpg'
            ],
            [
                'name' => 'Porsche 911',
                'description' => 'The Porsche 911 is a two-door, 2+2 high-performance rear-engined sports car made since 1963.',
                'price' => 150000,
                'imageSrc' => 'https://cdn.motor1.com/images/mgl/Oo3xke/s3/mansory-p9lm-evo-900-porsche-911-turbo-s.jpg'
            ],
            [
                'name' => 'Audi R8',
                'description' => 'The Audi R8 is a mid-engine, 2-seater sports car which uses Audi\'s trademark quattro permanent all-wheel drive system.',
                'price' => 180000,
                'imageSrc' => 'https://media.ed.edmunds-media.com/audi/r8/2022/oem/2022_audi_r8_coupe_performance_fq_oem_1_1600.jpg'
            ],
            [
                'name' => 'McLaren 720S',
                'description' => 'The McLaren 720S is a sports car designed and manufactured by British car manufacturer McLaren Automotive.',
                'price' => 350000,
                'imageSrc' => 'https://www.autocar.co.uk/sites/autocar.co.uk/files/mclaren-720s-1.jpg'
            ],
            [
                'name' => 'Chevrolet Corvette',
                'description' => 'The Chevrolet Corvette, colloquially known as the "Vette", is a two-door, two-passenger sports car.',
                'price' => 70000,
                'imageSrc' => 'https://www.motortrend.com/uploads/2022/09/2023-Chevrolet-Corvette-Z07-05.jpg?w=768&width=768&q=75&format=webp'
            ],
            [
                'name' => 'Nissan GT-R',
                'description' => 'The Nissan GT-R is a high-performance sports car produced by Nissan.',
                'price' => 110000,
                'imageSrc' => 'https://global.nissannews.com/page-MVGhb/attachment/90cf3c27477ce38a360fc1053c2e058cb7a9989d'
            ],
            [
                'name' => 'Ford Mustang Shelby GT500',
                'description' => 'The Ford Mustang Shelby GT500 is a high-performance variant of the Ford Mustang.',
                'price' => 85000,
                'imageSrc' => 'https://www.carscoops.com/wp-content/uploads/2023/08/Ford-Mustang-Shelby-GT500-3a.jpg'
            ],
            [
                'name' => 'BMW M4',
                'description' => 'The BMW M4 is a high-performance version of the BMW 4 Series.',
                'price' => 80000,
                'imageSrc' => 'https://www.thedrive.com/content/2018/09/img_0199.jpg?quality=85&crop=16%3A9&auto=webp&optimize=high&quality=70&width=1440'
            ],
            [
                'name' => 'Mercedes-AMG GT',
                'description' => 'The Mercedes-AMG GT is a sports car produced in coupé and roadster form by Mercedes-AMG.',
                'price' => 200000,
                'imageSrc' => 'https://www.autocar.co.uk/sites/autocar.co.uk/files/mercedes-amg-gt-review-2023-00-tracking-front.jpg'
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
};
