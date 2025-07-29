#!/bin/bash

echo "🌿 Verificando Sistema de Registro de Hierbas..."
echo "=================================================="

# Función para verificar si un puerto está en uso
check_port() {
    port=$1
    service_name=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "✅ $service_name está ejecutándose en puerto $port"
        return 0
    else
        echo "❌ $service_name NO está ejecutándose en puerto $port"
        return 1
    fi
}

# Función para hacer una petición HTTP
check_http() {
    url=$1
    service_name=$2
    if curl -s --max-time 10 "$url" > /dev/null 2>&1; then
        echo "✅ $service_name responde correctamente"
        return 0
    else
        echo "❌ $service_name NO responde"
        return 1
    fi
}

# Verificar MySQL
echo ""
echo "📋 Verificando MySQL..."
if command -v mysql &> /dev/null; then
    echo "✅ MySQL está instalado"
    
    # Verificar si MySQL está ejecutándose
    if pgrep mysql > /dev/null; then
        echo "✅ MySQL está ejecutándose"
        
        # Verificar si existe la base de datos
        if mysql -u root -e "USE hierbas_db; SELECT 1;" 2>/dev/null; then
            echo "✅ Base de datos 'hierbas_db' existe y es accesible"
        else
            echo "❌ Base de datos 'hierbas_db' no existe o no es accesible"
            echo "💡 Ejecuta: mysql -u root -p < registro-plantas/database-setup.sql"
        fi
    else
        echo "❌ MySQL no está ejecutándose"
        echo "💡 Inicia MySQL: sudo systemctl start mysql"
    fi
else
    echo "❌ MySQL no está instalado"
fi

# Verificar Java
echo ""
echo "☕ Verificando Java..."
if command -v java &> /dev/null; then
    java_version=$(java -version 2>&1 | head -n 1 | cut -d'"' -f 2)
    echo "✅ Java instalado: $java_version"
else
    echo "❌ Java no está instalado"
fi

# Verificar Maven
echo ""
echo "🔧 Verificando Maven..."
if command -v mvn &> /dev/null; then
    mvn_version=$(mvn -version 2>&1 | head -n 1)
    echo "✅ Maven instalado: $mvn_version"
else
    echo "❌ Maven no está instalado"
fi

# Verificar Node.js
echo ""
echo "🟢 Verificando Node.js..."
if command -v node &> /dev/null; then
    node_version=$(node --version)
    echo "✅ Node.js instalado: $node_version"
else
    echo "❌ Node.js no está instalado"
fi

# Verificar npm
if command -v npm &> /dev/null; then
    npm_version=$(npm --version)
    echo "✅ npm instalado: $npm_version"
else
    echo "❌ npm no está instalado"
fi

# Verificar servicios ejecutándose
echo ""
echo "🚀 Verificando servicios..."

# Backend Spring Boot
check_port 8080 "Backend Spring Boot"

# Frontend React
check_port 3000 "Frontend React"

# Verificar APIs si están ejecutándose
echo ""
echo "🌐 Verificando APIs..."

if check_port 8080 > /dev/null; then
    check_http "http://localhost:8080/api/usuarios/test" "API de Usuarios"
    check_http "http://localhost:8080/api/hierbas/test" "API de Hierbas"
fi

if check_port 3000 > /dev/null; then
    check_http "http://localhost:3000" "Frontend React"
fi

# Verificar estructura de archivos
echo ""
echo "📁 Verificando estructura del proyecto..."

files=(
    "registro-plantas/pom.xml"
    "registro-plantas/src/main/java/com/plantas/registro_plantas/RegistroPlantasApplication.java"
    "registro-plantas/src/main/resources/application.yml"
    "registro-plantas/database-setup.sql"
    "hierbas-frontend/package.json"
    "hierbas-frontend/src/App.js"
    "hierbas-frontend/src/components/Login.js"
    "hierbas-frontend/src/components/RegistroHierba.js"
    "hierbas-frontend/src/components/ListaHierbas.js"
    "hierbas-frontend/src/services/api.js"
    "README.md"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file NO ENCONTRADO"
    fi
done

# Resumen final
echo ""
echo "📊 RESUMEN DEL SISTEMA"
echo "======================"

# Contar servicios activos
backend_running=$(check_port 8080 "Backend" >/dev/null 2>&1 && echo 1 || echo 0)
frontend_running=$(check_port 3000 "Frontend" >/dev/null 2>&1 && echo 1 || echo 0)

if [ "$backend_running" = "1" ] && [ "$frontend_running" = "1" ]; then
    echo "🎉 ¡SISTEMA COMPLETAMENTE FUNCIONAL!"
    echo ""
    echo "🌐 URLs de acceso:"
    echo "   • Frontend: http://localhost:3000"
    echo "   • Backend API: http://localhost:8080/api"
    echo ""
    echo "👤 Usuarios de prueba:"
    echo "   • admin@hierbas.com / admin123"
    echo "   • usuario@test.com / test123"
elif [ "$backend_running" = "1" ]; then
    echo "🔶 Backend funcionando, Frontend no iniciado"
    echo "💡 Para iniciar el frontend: cd hierbas-frontend && npm start"
elif [ "$frontend_running" = "1" ]; then
    echo "🔶 Frontend funcionando, Backend no iniciado"
    echo "💡 Para iniciar el backend: cd registro-plantas && ./mvnw spring-boot:run"
else
    echo "🔴 Ningún servicio está ejecutándose"
    echo ""
    echo "🚀 Para iniciar el sistema:"
    echo "1. cd registro-plantas && ./mvnw spring-boot:run &"
    echo "2. cd hierbas-frontend && npm start"
fi

echo ""
echo "📚 Para más información, consulta el README.md"